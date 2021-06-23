
export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'yellow' | 'cyan' | 'green' | 'blue' | 'red' | 'gray';
}

export const labels = ['purple', 'yellow', 'cyan', 'green', 'blue', 'red', 'gray'];
