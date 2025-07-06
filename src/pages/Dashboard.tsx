
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import TaskFilters from '@/components/TaskFilters';
import TaskStats from '@/components/TaskStats';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create a modern and responsive landing page for the new product launch',
      priority: 'high' as const,
      status: 'in-progress' as const,
      dueDate: '2025-07-08',
      assignee: 'Manickam',
      tags: ['design', 'frontend']
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Set up OAuth integration with Google, GitHub, and Facebook',
      priority: 'high' as const,
      status: 'todo' as const,
      dueDate: '2025-07-10',
      assignee: 'Manickam',
      tags: ['backend', 'auth']
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST endpoints for the task management API',
      priority: 'medium' as const,
      status: 'todo' as const,
      dueDate: '2025-07-12',
      assignee: 'Manickam',
      tags: ['documentation', 'api']
    },
    {
      id: '4',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment workflows',
      priority: 'medium' as const,
      status: 'completed' as const,
      dueDate: '2025-07-05',
      assignee: 'Manickam',
      tags: ['devops', 'automation']
    },
    {
      id: '5',
      title: 'Database optimization',
      description: 'Optimize database queries and add proper indexing',
      priority: 'low' as const,
      status: 'todo' as const,
      dueDate: '2025-07-15',
      assignee: 'Manickam',
      tags: ['database', 'performance']
    }
  ]);

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    pending: tasks.filter(task => task.status !== 'completed').length,
    overdue: tasks.filter(task => {
      const dueDate = new Date(task.dueDate || '');
      const today = new Date();
      return dueDate < today && task.status !== 'completed';
    }).length
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, status: newStatus as any } : task
      )
    );
    
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus.replace('-', ' ')}`,
    });
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...tasks];
    
    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'today') {
        const today = new Date().toDateString();
        filtered = filtered.filter(task => 
          task.dueDate && new Date(task.dueDate).toDateString() === today
        );
      } else if (filters.status === 'overdue') {
        const today = new Date();
        filtered = filtered.filter(task => {
          const dueDate = new Date(task.dueDate || '');
          return dueDate < today && task.status !== 'completed';
        });
      } else {
        filtered = filtered.filter(task => task.status === filters.status);
      }
    }
    
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }
    
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'dueDate':
            return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }
    
    setFilteredTasks(filtered);
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Manickam! 👋</h1>
            <p className="text-purple-100 text-lg">
              You have {taskStats.pending} pending tasks and {taskStats.overdue} overdue tasks.
            </p>
          </div>
        </div>

        {/* Stats */}
        <TaskStats stats={taskStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TaskFilters onFilterChange={handleFilterChange} taskCounts={taskStats} />
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Tasks ({filteredTasks.length})
              </h2>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onStatusChange={handleStatusChange} 
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Plus className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-500 mb-4">Create your first task to get started!</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
