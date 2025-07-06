
import { useState } from 'react';
import { MoreHorizontal, Calendar, User, Flag, CheckCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
    dueDate?: string;
    assignee?: string;
    tags: string[];
  };
  onStatusChange: (id: string, status: string) => void;
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed');

  const handleToggleComplete = () => {
    const newStatus = isCompleted ? 'todo' : 'completed';
    setIsCompleted(!isCompleted);
    onStatusChange(task.id, newStatus);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border border-gray-200 group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 p-0 h-5 w-5"
              onClick={handleToggleComplete}
            >
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-gray-900 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-3">
                <Badge className={priorityColors[task.priority]} variant="outline">
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </Badge>
                <Badge className={statusColors[task.status]} variant="outline">
                  {task.status.replace('-', ' ')}
                </Badge>
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                {task.dueDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                {task.assignee && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {task.assignee}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
