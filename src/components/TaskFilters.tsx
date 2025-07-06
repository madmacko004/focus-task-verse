
import { useState } from 'react';
import { Filter, Calendar, Flag, User, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface TaskFiltersProps {
  onFilterChange: (filters: any) => void;
  taskCounts: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
}

const TaskFilters = ({ onFilterChange, taskCounts }: TaskFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const quickFilters = [
    { label: 'All Tasks', value: 'all', count: taskCounts.total },
    { label: 'Due Today', value: 'today', count: 5 },
    { label: 'Overdue', value: 'overdue', count: taskCounts.overdue },
    { label: 'Completed', value: 'completed', count: taskCounts.completed },
    { label: 'In Progress', value: 'in-progress', count: 8 }
  ];

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Quick Filters */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Quick Filters
            </h3>
            <div className="space-y-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant="ghost"
                  className="w-full justify-between text-left h-auto py-2 px-3 hover:bg-gray-50"
                  onClick={() => onFilterChange({ status: filter.value })}
                >
                  <span className="text-sm">{filter.label}</span>
                  <Badge variant="outline" className="text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Flag className="h-4 w-4 mr-2" />
              Priority
            </h3>
            <Select onValueChange={(value) => onFilterChange({ priority: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort By
            </h3>
            <Select onValueChange={(value) => onFilterChange({ sortBy: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Due Date
            </h3>
            <Select onValueChange={(value) => onFilterChange({ dueDate: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Due Today</SelectItem>
                <SelectItem value="tomorrow">Due Tomorrow</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;
