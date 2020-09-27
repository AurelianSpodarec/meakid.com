


function Accordion({ title, children }) {
    return (
        <div>
            <div>
                <p>{title}</p>
            </div>
            {children}
        </div>
    )
}

export default Accordion;