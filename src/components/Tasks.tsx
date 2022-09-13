import { TaskInteface } from '../App';
import styles from './Tasks.module.css';
import { Task } from './Task';
import { Clipboard } from 'phosphor-react';

interface Props {
    tasks: TaskInteface[];
    onDeleteTask: (taskId: string) => void;
    onToggleTaskIsCompleted: (taskId: string) => void;
}

export function Tasks({tasks, onDeleteTask, onToggleTaskIsCompleted}: Props) {
    const taskAmount = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return(
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Tarefas Criadas</p>
                    <span>{taskAmount}</span>
                </div>
                <div>
                    <p className={styles.textPurple}>Concluídas</p>
                    <span>{completedTasks} de {taskAmount}</span>
                </div>
            </header>
            <div className={styles.taskList}>
                {
                    tasks.map(task => {
                        return <Task key={task.id} task={task} onDeleteTask={onDeleteTask} onToggleTaskIsCompleted={onToggleTaskIsCompleted}/>
                    })
                }

                {tasks.length <= 0 && (
                    <section className={styles.empty}>
                        <Clipboard size={60}/>
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </section>
                )}

            </div>
        </section>
    );
}