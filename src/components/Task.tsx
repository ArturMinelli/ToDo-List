import styles from './Task.module.css';
import { Trash } from 'phosphor-react';
import { TaskInteface } from '../App';
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface Props {
    task: TaskInteface;
    onDeleteTask: (taskId: string) => void;
    onToggleTaskIsCompleted: (taskId: string) => void;
}

export function Task({task, onDeleteTask, onToggleTaskIsCompleted}: Props) {
    return(
        <div className={styles.task}>
            <button onClick={() => onToggleTaskIsCompleted(task.id)} className={styles.checkContainer}>
                {task.isCompleted ? <BsFillCheckCircleFill /> : <div /> }
            </button>
            <p className={task.isCompleted ? styles.taskCompleted : ""}>{task.title}</p>
            <button onClick={() => onDeleteTask(task.id)} className={styles.deleteButton}>
                <Trash />
            </button>
        </div>
    );
}