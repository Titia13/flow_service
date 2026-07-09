'use client'

import Image from "next/image";
import removebg from "@/public/successful.svg";
import { Form } from "@/components/organisms/file/Form";

export default function File() {

    return (
        <>
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-10 text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Téléchargement de fichiers</h1>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Sélectionnez l'application et le modèle souhaité
                        pour procéder au traitement de vos fichiers en toute simplicité.
                    </p>
                    <div className="hidden md:flex flex-1 items-center justify-center p-4">
                        <Image src={removebg} alt="uploading" width={200} height={200} style={{ height: 'auto' }} priority />
                    </div>
                </div>
                <div>
                    <Form />
                </div>
            </div>
        </>
    )
}