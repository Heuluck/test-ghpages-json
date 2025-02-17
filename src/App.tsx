import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState<VersionData>();
    useEffect(() => {
        getVersionData().then((data) => {
            setData(data);
        });
    }, []);
    return (
        <>
            <input
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border border-gray-400 rounded-lg my-8 mx-8"
                placeholder="Search for a version"
            />
            <a href="./versions.json" target="_blank" rel="noreferrer" className="text-blue-500">
                JSON File
            </a>
            <div className="flex flex-col gap-4 text-gray-600">
                {data ? (
                    Object.keys(data)
                        .filter((keys) => {
                            return search ? keys.includes(search) : keys;
                        })
                        .map((key, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row gap-4 items-center border rounded-xl border-gray-300 p-4">
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
}

interface VersionData {
    [key: string]: {
        versions: {
            original: string;
            converted: string[];
        }[];
    };
}

async function getVersionData(): Promise<VersionData> {
    const response = await fetch('./versions.json', {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
        },
    });
    const data = await response.json();
    return data;
}

export default App;
