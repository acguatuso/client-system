

export type serviceMain = {
    estado: number,
    titulo: string,
    subtitulo: string,
    image_url: string,
    download_url: string    
}

export type service = {
    estado: number
    id: string,
    titulo: string,
    subtitulo: string,
    descripcion: string,
    posicion_id: number,
    image_url: string,
    download_url: string,
    links: Object[],    
}

export type linkList = {
    link: Object[]
}