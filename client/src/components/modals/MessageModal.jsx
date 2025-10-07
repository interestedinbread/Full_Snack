import ReactDom from "react-dom"
import { motion } from "framer-motion"


export function MessageModal (props) {

    const { modalMessage, setMessageModalOpen } = props

    return ReactDom.createPortal(
        <div className="fixed inset-0 flex mt-55 justify-center z-30 p-4
                      md:left-1/2 md:transform md:-translate-x-1/2 md:w-96 md:h-[800px] md:rounded-[2.5rem] md:overflow-hidden
                      lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-96 lg:h-[800px] lg:rounded-[2.5rem] lg:overflow-hidden lg:border-4 lg:border-gray-300">
            <button className="fixed inset-0 bg-black bg-opacity-50 z-40
                              md:w-96 md:h-[800px] md:left-1/2 md:transform md:-translate-x-1/2 md:rounded-[2.5rem] md:inset-auto
                              lg:w-96 lg:h-[800px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:rounded-[2.5rem]"
            onClick={() => {
                setMessageModalOpen(false)
            }}/>
            <motion.div className="w-2/3 bg-[var(--secondary-color)] rounded-md p-4 h-max z-50
                                 md:w-80 md:left-1/2 md:transform md:-translate-x-1/2 md:top-32 md:rounded-lg md:fixed md:inset-auto
                                 lg:w-60 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-70 lg:rounded-lg lg:fixed lg:inset-auto"
            key="message-portal"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <p className="text-white poppins-regular text-lg">
                    {modalMessage}
                </p>
                <motion.button className="ml-4 mt-4 bg-white text-black px-2 rounded-lg border-3 border-green-400"
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                    setTimeout(() => {
                        setMessageModalOpen(false)
                    }, 100)
                }}>
                    Okay
                </motion.button>
            </motion.div>
        </div>,
        document.getElementById('portal')
    )}

