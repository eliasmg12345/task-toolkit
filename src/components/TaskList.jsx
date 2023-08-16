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
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-5'>
        <h1># Task: {tasks.length}</h1>
        <Link to='/create-task' className='bg-indigo-600 px-2 py-1 text-sm rounded-xl'>
          Create Task
        </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        {tasks.map(task => (
          <div key={task.id} className="bg-neutral-700 p-4 rounded-md">
            <header className='flex justify-between'>
              <h3>{task.title}</h3>
              <div className='flex gap-x-1'>
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
                >Edit</Link>
                <button
                  onClick={() => { handleDelete(task.id) }}
                  className="bg-red-600 px-2 py-1 text-xs rounded-md"
                >Delete</button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList