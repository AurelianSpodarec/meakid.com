
function ImageVariationItem({ currentProduct, item, selectedColor, onClick }: any) {

    return (
        <button
            className={(item.color === selectedColor ? "border-solid border-2 border-gray-900" : "") + " inline-block border-2 border-gray-200 mr-1 outline-none"}
            onClick={() => onClick(item.color)}
            key={item.color}
        >
            {
                <img
                    className="h-16 w-16"
                    src={item.image}
                />
            }

        </button>
    )
}

export default ImageVariationItem;
