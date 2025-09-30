const Loading = () => {
  console.log("Rendering Loading component");

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6">
       <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjJmODIybWYyanFwdHIzYnR0ZDI4Ynl0bTZja3RoZ2RsNm82YWZ1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/aw4wNozcqrLCPKqljH/giphy.gif" alt="Loading..." className="w-30 h-30"/>
      </div>
    </div>
  );
};

export default Loading;
