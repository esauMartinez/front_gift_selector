import React, { Fragment, useState } from 'react'
import { useDispatch } from "react-redux"
import { read, utils } from "xlsx"
import { updateArrayEmployeesXLSX } from "../../features/gift/giftAction"
import Swal from 'sweetalert2'

const FormFile = () => {

    const [file, setFile] = useState(null)
    const dispatch = useDispatch() 

    const changeInputFile = (e) => {
        const mimeType = e.target.files[0].name.split('.')[1]
        if (mimeType !== 'xlsx' && mimeType !== 'xls') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El tipo de archivo no es correcto'
            })
            document.getElementsByName('file')[0].value = ''
            setFile(null)
        } else {
            setFile(e.target.files[0])
        }
    }

    const readFileXLSX = () => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onload = async (e) => {
            const bstr = e.target.result
            const wb = read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true })
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = utils.sheet_to_json(ws)
            dispatch(updateArrayEmployeesXLSX(data))
        }

        if (rABS) {
            reader.readAsBinaryString(file)
        } else {
            reader.readAsArrayBuffer(file)
        }
    }

    return (
        <Fragment>
            <form action="">
                <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={changeInputFile}
                />
                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    disabled={file === null}
                    onClick={() => readFileXLSX(file) }
                >
                    Aceptar
                </button>
            </form>
        </Fragment>
    )
}

export default FormFile