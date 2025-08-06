import ReactDom from "react-dom"
import { motion } from "framer-motion"


export function DeniedModal (props) {

    const { setDenied } = props

    return ReactDom.createPortal(
        <div className="fixed inset-0 flex mt-40 justify-center z-30 p-4">
            <button className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => {
                setDenied(false)
            }}/>
            <motion.div className="w-2/3 bg-[var(--secondary-color)] rounded-md p-4 h-max z-50"
            key="denied-portal"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <p className="text-white poppins-regular text-lg">
                    Please login to use this feature.
                </p>
                <motion.button className="ml-4 mt-4 bg-white text-black px-2 rounded-lg border-3 border-green-400"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    setTimeout(() => {
                        setDenied(false)
                    }, 100)
                }}>
                    Okay
                </motion.button>
            </motion.div>
        </div>,
        document.getElementById('portal')
    )}

