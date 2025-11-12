import { useState, useMemo } from 'react';
import { MatchPreview, NewsArticle } from '../types';

interface SearchableItem {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  type: 'preview' | 'news';
}

export const useSearch = (previews: MatchPreview[], articles: NewsArticle[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchableItems: SearchableItem[] = useMemo(() => {
    const previewItems: SearchableItem[] = previews.map(preview => ({
      id: preview.id,
      title: preview.title,
      excerpt: preview.excerpt,
      tags: preview.tags,
      type: 'preview'
    }));

    const articleItems: SearchableItem[] = articles.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      tags: article.tags,
      type: 'news'
    }));

    return [...previewItems, ...articleItems];
  }, [previews, articles]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    
    return searchableItems.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const excerptMatch = item.excerpt.toLowerCase().includes(query);
      const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(query));
      
      return titleMatch || excerptMatch || tagMatch;
    });
  }, [searchQuery, searchableItems]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults
  };
};
