
function ImageVariationItem({ currentProduct, item, selectedColor, onClick }: any) {

    console.log("sdsd", item)
    return (
        <button
            className={(item.color === selectedColor ? "border-solid border-2 border-gray-900" : "") + " inline-block border-2 border-gray-200 mr-1 outline-none"}
            onClick={() => onClick(item.color)}
            key={item.color}
        >
            {
                <div>
                    <img
                        className="h-16 w-16"
                        src={item.image}
                    />
                    <div style={{
                        fontSize: "10px",
                        textTransform: "uppercase"
                    }}>
                        {item.color}
                    </div>
                </div>
            }

        </button>
    )
}

export default ImageVariationItem;
