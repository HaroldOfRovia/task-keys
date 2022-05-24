import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [id, setId] = useState(0);
    const [list, setList] = useState(props.initialData);
    let name: string;

    let map = list
        .map((item) => {
            if (id === item.id) {
                return (
                    <input
                        key={item.id}
                        autoFocus
                        defaultValue={item.name}
                        onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                name = (event.target as HTMLInputElement).value;
                                let array: IItem[] = [];
                                list.forEach((item) => {
                                    if (item.id === id) item.name = name;
                                    array.push(item);
                                });
                                setList(array);
                                setId(0);
                            }
                            if (event.keyCode === 27) setId(0);
                        }}
                    ></input>
                );
            } else {
                return (
                    <li key={item.id} onClick={() => setId(item.id)}>
                        {item.name}
                    </li>
                );
            }
        })
        .sort();

    if (props.sorting === 'DESC') map.reverse();

    return <div>{map}</div>;
}
