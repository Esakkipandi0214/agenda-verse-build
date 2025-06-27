
import React from 'react';
import { useTodos } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X, Filter, SortAsc, SortDesc } from 'lucide-react';

const TodoFilters = () => {
  const {
    filter,
    setFilter,
    searchQuery,
    setSearch,
    selectedTags,
    setSelectedTags,
    sortBy,
    sortOrder,
    setSort,
    getAllTags,
  } = useTodos();

  const allTags = getAllTags();

  const filterOptions = [
    { value: 'all', label: 'All Tasks', count: 0 },
    { value: 'active', label: 'Active', count: 0 },
    { value: 'completed', label: 'Completed', count: 0 },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Created Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' },
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearAllFilters = () => {
    setSearch('');
    setSelectedTags([]);
    setFilter('all');
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || filter !== 'all';

  return (
    <Card className="gradient-card border-0 shadow-lg mb-6">
      <CardContent className=" p-6">
        <div className="flex flex-col space-y-4">
          {/* Search and Quick Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="sm:flex hidden gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(option.value as any)}
                  className={filter === option.value ? 'gradient-primary' : ''}
                >
                  {option.label}
                </Button>
              ))}
            </div>

             <div className="grid grid-cols-3 justify-between sm:hidden gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(option.value as any)}
                  className={filter === option.value ? 'gradient-primary' : ''}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort and Advanced Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex  items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select
                value={sortBy}
                onValueChange={(value: any) => setSort(value, sortOrder)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSort(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2"
              >
                {sortOrder === 'asc' ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </Button>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-700 mb-2 block">Filter by tags:</span>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoFilters;
