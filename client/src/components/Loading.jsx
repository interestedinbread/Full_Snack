export function Loading() {
    
    return(
        <>
            <div className="w-max mx-auto mt-8">
                <h3 className="text-3xl poppins-extrabold mt-3 text-white animate-pulse">Loading...</h3>
                <img src="/img/Carrot_icon.png" 
                    className="h-[200px] w-[200px] animate-spin mt-4"
                    style={{ animationDuration: '6s' }}
                    />
                <p className="text-white text-center poppins-extrabold mt-4">Let us cook!</p>
            </div>
        </>
    )
}