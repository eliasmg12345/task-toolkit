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
        <form onSubmit={handleSubmit}>
            <input
                name='title'
                type="text"
                placeholder='title'
                onChange={handleChange}
                value={task.title}
            />

            <textarea
                name="description"
                placeholder='description'
                onChange={handleChange}
                value={task.description}
            ></textarea>

            <button>save</button>
        </form>
    )
}

export default TaskForm