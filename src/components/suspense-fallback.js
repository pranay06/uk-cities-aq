import {FaSpinner} from 'react-icons/fa'

export default function SuspenseFallback ({loadingMessage}) {
    return <div aria-busy="true">
            <FaSpinner icon="spinner" className="spinner"/>
            <div>{loadingMessage}</div>
        </div>;
}