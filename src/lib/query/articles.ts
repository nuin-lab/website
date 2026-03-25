/*
 * Copyright 2026 nuin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getCollection } from 'astro:content';

import { format } from '../../utils/date';

// Types
import type { CollectionEntry } from 'astro:content';
import type { CardData, CarouselItemData } from '../../types/article.types';

/**
 * 有効なすべての投稿を取得
 *
 * _ただし、開発環境においては無効（公開日を過ぎていない）状態の投稿も含めて取得する。_
 */
export async function getAvailableArticles(): Promise<Array<CollectionEntry<'articles'>>> {
  const availableArticles = (
    await getCollection('articles', ({ data }) => {
      if (import.meta.env.DEV) {
        return true;
      }

      return data.publishedAt !== undefined;
    })
  ).sort((a, b) => {
    if (!a.data.publishedAt || !b.data.publishedAt) {
      return -1;
    }

    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });

  return availableArticles;
}

/**
 * おすすめの投稿をすべて取得
 */
export async function getFeaturedArticles(): Promise<Array<CarouselItemData>> {
  const featuredArticles = (await getAvailableArticles())
    .flatMap(({ id, data }) => {
      if (!data.featured) {
        return [];
      }

      return {
        title: data.title,
        slug: id,
        img: data.img,
        sort: data.featured,
      };
    })
    .sort((a, b) => b.sort - a.sort);

  const len = featuredArticles.length;

  if (!import.meta.env.DEV && len < 3) {
    throw new Error('おすすめ記事が少なすぎます');
  }

  return featuredArticles.slice(0, Math.min(len, 5));
}

/**
 * 最新の投稿を取得
 */
export async function getLatestArticles(): Promise<{ articleCards: Array<CardData>; hasMore: boolean }> {
  const latestArticles = (await getAvailableArticles()).flatMap(({ id, data }) => {
    const publishedAt = format(data.publishedAt);

    if (!publishedAt) {
      if (import.meta.env.DEV) {
        return [];
      }

      throw new Error('An unexpected error has occurred');
    }

    return {
      title: data.title,
      date: publishedAt,
      slug: id,
      img: data.img,
    };
  });

  const len = latestArticles.length;

  if (!import.meta.env.DEV && len < 5) {
    throw new Error('記事が少なすぎます');
  }

  return {
    articleCards: latestArticles.slice(0, Math.min(len, 11)),
    hasMore: len > 11,
  };
}
