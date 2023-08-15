import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteTak } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'

const TaskList = () => {

  const dispatch = useDispatch()

  const tasks = useSelector(state => state.tasks)

  const handleDelete = id => {
    dispatch(deleteTak(id))
  }

  return (
    <div>
      <header>
        <h1>Task {tasks.length}</h1>
        <Link to='/create-task'>
          Create Task
        </Link>
      </header>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => { handleDelete(task.id) }}>Delete</button>
          <Link to={`/edit-task/${task.id}`} >Edit</Link>
        </div>
      ))}
    </div>
  )
}

export default TaskList