import NewBox from './NewBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) => {
    const { colors } = props


    const Boxes = colors.map((color, i) =>
        <NewBox

            index={i}
            key={color.name}
            name={color.name}
            color={color.color}
            deleteBtn={props.delete}
        />)
    return (
        <div
            style={{ height: '100%' }}>
            {Boxes}
        </div>
    );
})

export default DraggableColorList;