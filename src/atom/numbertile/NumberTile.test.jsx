import {render, screen} from '@testing-library/react';
import NumberTile from './NumberTile';

describe("", ()=>{
    
    const mockProps = {
        number : "12345666"
    }

    test("Number tile rendering with props", ()=> {
        render(<NumberTile {...mockProps}/>);
        
        expect(screen.getByText("12,345,666")).toBeInTheDocument();
    })

    const mockPropsEmpty = {
        number : ""
    }

     test("Number tile rendering with empty Prop", ()=> {
        render(<NumberTile {...mockPropsEmpty}/>);
        expect(screen.getByText("0")).toBeInTheDocument();
    })

})