const ProgressBar = ({ progress }) => {
    return <>
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div className="flex flex-col w-full">
                    <div className="flex relative pt-1">
                        <div className="flex flex-col w-full pt-1">
                            <div className="flex w-full items-end">
                                <div
                                    className="w-full bg-gray-200 rounded-full"
                                >
                                    <div
                                        style={{ width: `${progress}%` }}
                                        className="bg-[#00A9FF] py-1 md:py-1 lg:py-2 2xl:py-2 rounded-full"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default ProgressBar