import React, {useCallback, useState} from 'react';
import {FiUpload} from 'react-icons/fi'
import {useDropzone} from 'react-dropzone';
import './style.css'

interface Props{
    onFileUpload: (file: File)=> void
    urlFoto: string
}

const Dropzone: React.FC<Props> = ({onFileUpload, urlFoto}) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    
    const onDrop = useCallback((acceptedFiles: any) => {

        console.log(acceptedFiles)        

        const file = acceptedFiles[0]

        if(file.type != "image/jpg" && file.type != "image/jpeg"&&  file.type != "image/png"){
            alert('arquivo inválido')
            return false;
        }else{
            const fileUrl = URL.createObjectURL(file)
            setSelectedFileUrl(fileUrl)
        }        

        onFileUpload(file)

    }, [onFileUpload])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return(
        <div className='dropzone' { ...getRootProps()}>

            <input {...getInputProps} accept='image/*' />

            {

                selectedFileUrl ?

                <img src={selectedFileUrl} />
                :
                    
                urlFoto != '' ?
                    <img src={urlFoto} />
                    :
                    <p>
                    <FiUpload />
                    Foto do perfil
                    </p>

            }

            
            
        </div>
    )

}

export default Dropzone