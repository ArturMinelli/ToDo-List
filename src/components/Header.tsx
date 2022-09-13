import styles from './Header.module.css';

import rocketIcon from '../assets/rocket.svg';
import plusIcon from '../assets/plus.svg';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Props {
    onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: Props) {
    const [title, setTitle] = useState('');
    const isNewTaskEmpty = title.length <= 0;

    function handleAddTask(event: FormEvent) {
        event.preventDefault();

        onAddTask(title);
        setTitle('');
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function handleInvalidTask(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Esse campo deve ser preenchido');
    }


    return(
        <header className={styles.header}>
            <img src={rocketIcon} alt="Foguete Rocketseat" />
            <p><span>to</span>do</p>

            <form onSubmit={handleAddTask} className={styles.newTaskForm}>
                 <input required onInvalid={handleInvalidTask} autoComplete='off' value={title} onChange={onChangeTitle} name='newTask' type="text" placeholder='Adicione uma nova tarefa'/>
                 <button disabled={isNewTaskEmpty} type='submit'>Criar <img src={plusIcon}/></button>
            </form>
        </header>
    );
}