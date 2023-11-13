import { useRef, useState } from "react";
import WhiteBoard from "../../components/Whiteboard";
import "./index.css";
const RoomPage =({user, socket}) => {
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const handleClearCanvas =() => {
        const canvas =canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillRect= "white";
        ctxRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height);
        setElements([]);
    }
    const undo = () =>{
        setHistory((prevHistory)=> [...prevHistory,elements[elements.length -1]]);
        setElements((prevElements) =>  prevElements.slice(0,prevElements.length-1));
    }
    const redo = () =>{
        setElements((prevElements)=> [...prevElements,history[history.length -1]]);
        setHistory((prevHistory) =>  prevHistory.slice(0,prevHistory.length-1));
    }
    return (
        <div className="row">
            <h1 className="text-center py-4">White Board Sharing App
            <span className="text-primary"> [User Online : 0]</span>
            </h1>
            {
                user?.presenter &&(
                    <div className="col-md-10 mx-auto px-5 mb-3 d-flex align-items-center justify-content-center">
                    <div className="d-flex col-md-2 justify-content-center gap-1">
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="pencil">Pencil</label>
                            <input
                                type="radio"
                                name="tool"
                                value="pencil"
                                checked={tool === "pencil"}
                                placeholder="pencil"
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="line">line</label>
                            <input
                                type="radio"
                                name="tool"
                                value="line"
                                checked={tool === "line"}
                                placeholder="line"
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-1 align-items-center">
                            <label htmlFor="rect">rect</label>
                            <input
                                type="radio"
                                name="tool"
                                value="rect"
                                checked={tool === "rect"}
                                placeholder="rect"
                                className="mt-1"
                                onChange={(e) => setTool(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 mx-auto">
                        <div className="d-flex align-items-center">
                            <label htmlFor="color">Select Color: </label>
                            <input
                                type="color"
                                id="color"
                                className="mt-1 ms-3"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 d-flex gap-2">
                        <button className="btn btn-primary mt-1"
                        disabled={elements.length == 0}
                        onClick={() => undo()}
                        >Undo</button>
                        <button className="btn btn-outline-primary mt-1"
                        disabled={history.length < 1}
                        onClick={() => redo()}
                        >Redo</button>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={handleClearCanvas}>Clear Canvas</button>
                    </div>
                    </div>
                )
            }

            <div className="col-md-10 mx-auto mt-4 canvas-box">
                <WhiteBoard
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                elements={elements}
                setElements={setElements}
                color={color}
                tool ={tool}
                user = {user}
                socket = {socket}
            />
            </div>
        </div>
    )
}

export default RoomPage;