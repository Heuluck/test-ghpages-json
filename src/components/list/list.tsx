export interface VersionData {
    [key: string]: {
        versions: {
            original: string;
            converted: string[];
        }[];
    };
}

interface ListProps {
    data?: VersionData;
    search: string;
}

const List: React.FC<ListProps> = ({ data, search }) => {
    return (
        <>
            <div className="flex flex-col gap-4 text-gray-600 px-32 mt-16">
                {data ? (
                    Object.keys(data)
                        .filter((keys) => {
                            return search ? keys.includes(search) : keys;
                        })
                        .map((key, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-white flex flex-row gap-4 items-center border rounded-xl border-gray-300 p-4">
                                    <span className="font-bold text-2xl w-32 text-wrap text-gray-900">{key}</span>
                                    <div className="w-96">
                                        {data[key].versions.map((ver, index) => {
                                            return (
                                                <div key={index} className="flex flex-row gap-4 items-center">
                                                    <span className="font-bold text-lg min-w-16 text-left">
                                                        {ver.original}
                                                    </span>
                                                    <span>{ver.converted.join('  ')}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
};

export default List;
