
const Footer = () => {
  return (
    <footer className="bg-gray-800 min-h-20">
        <div className='flex justify-around my-10'>
            <div className="flex text-blue-500  flex-col gap-2">
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>


            </div>
            <div className="flex text-blue-500  flex-col gap-2">
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>

            </div>
            <div className="flex text-blue-500  flex-col gap-2">
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>
                <a href="#" className='hover:text-blue-300'>link1</a>

            </div>

        </div>
        <p className='bg-gray-500 h-0.5 w-4/5 mx-auto mb-8'></p>

        <p className='text-gray-300 text-center mb-8'>Artzy &copy; all rights reserved.</p>
        
    </footer>
  )
}

export default Footer