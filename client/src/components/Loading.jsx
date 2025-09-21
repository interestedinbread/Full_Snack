export function Loading() {
    
    const funFacts = [
        'Raspberries are a member of the rose family',
        'Potatoes were the first food planted in space',
        'Rhubarb grows so quickly that you can actually hear it',
        'the ancient Mayans used cocoa beans as currency',
        'there are over 7500 varieties of apples',
        "Saffron is the world's most expensive spice",
        "dark chocolate that's 70% cocao or higher has more caffeine per ounce than coffee",
        "the Caesar Salad was invented in Tijuana, Mexico in 1927",
        'Bananas, Pumpkins, and Lemons are technically berries',
        'Honey can be stored for centuries without spoiling',
        'Thomas Jefferson popularized Mac and Cheese in America'
    ]

    const random = Math.floor(Math.random() * funFacts.length)

    return(
        <>
            <div className="w-max mx-auto mt-8 -pl-4">
                <h3 className="text-3xl poppins-extrabold mt-3 text-white text-center animate-pulse">Loading...</h3>
                <img src="/img/Carrot_icon.png" 
                    className="h-[200px] w-[200px] animate-spin mt-4 mx-auto"
                    style={{ animationDuration: '6s' }}
                    />
                <p className="text-white text-center md:text-lg italic mt-4 max-w-[250px] md:max-w-[350px]">
                    {`Did you know that ${funFacts[random]}?`}
                    </p>
            </div>
        </>
    )
}