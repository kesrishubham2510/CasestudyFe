import {screen, render} from '@testing-library/react';
import TextTile from './TextTile';

describe("Testing Textile renders", ()=>{
     const mockProps = {
        text : "123,456,66"
    }

    test("Number tile rendering with props", ()=> {
        render(<TextTile {...mockProps}/>);
        
        expect(screen.getByText("123,456,66")).toBeInTheDocument();
    })
})