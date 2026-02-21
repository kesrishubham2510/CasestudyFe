import './pagetemplate.css';

function PageTemplate(props){
    return <div className='page-template'>
        {props.component}
        </div>
}

export default PageTemplate;