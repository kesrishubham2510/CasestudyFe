import {render, screen} from '@testing-library/react';
import TileHeader from './TileHeader';

describe("", ()=>{
    
    const mockProps = {
        header : "12345666"
    }

    test("Number tile rendering with props", ()=> {
        render(<TileHeader {...mockProps}/>);
        
        expect(screen.getByText("12345666")).toBeInTheDocument();
    })

})