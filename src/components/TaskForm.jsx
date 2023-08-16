import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { addTask, editTask } from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

const TaskForm = () => {

    const [task, setTask] = useState({
        title: '',
        description: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const tasks = useSelector(state => state.tasks)

    useEffect(() => {
        if (params.id) {
            setTask(tasks.find(task => task.id === params.id))
        }
    }, [params.id, tasks])

    const handleChange = e => {
        //console.log(e.target.name, e.target.value);
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (params.id) {
            dispatch(editTask(task))
        } else {
            dispatch(addTask({
                ...task,
                id: uuid()
            }))
        }

        navigate('/')
    }

    return (
        <form 
        onSubmit={handleSubmit}
        className="bg-zinc-800 max-w-sm p-4"
        >
            <label htmlFor="title" className="block text-xs font-bold mb-2">Task: </label>
            <input
                name='title'
                type="text"
                placeholder='title'
                onChange={handleChange}
                value={task.title}
                className="w-full p-2 rounded-md bg-zinc-700 mb-2"
            />
            <label htmlFor="description" className="block text-xs font-bold mb-2">Descripcion: </label>
            <textarea
                name="description"
                placeholder='description'
                onChange={handleChange}
                value={task.description}
                className="w-full p-2 rounded-md bg-zinc-700 mb-2"
            ></textarea>

            <button className='bg-indigo-700 px-2 py-1 rounded-md'>save</button>
        </form>
    )
}

export default TaskForm