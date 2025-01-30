const Welcome = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen w-full bg-red-200 p-5">
      <div className="flex bg-orange-400 p-5 rounded-lg">
        <div>
          <div className="border rounded-full w-20 h-20 flex items-center justify-center"> 
            image
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-5">
          <h1 className="text-3xl font-bold">Hi, David Bato-bato</h1>
          <p className="text-lg">A simple password manager app</p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
