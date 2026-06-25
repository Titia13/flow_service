'use client'

import Image from "next/image";
import removebg from "@/public/successful.svg";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import { useAppStore } from "../store/appStore";
import { useEffect, useMemo, useState } from "react";
import { useTemplateStore } from "../store/templateStore";

export default function File() {
    const { listApps, activeApps } = useAppStore();
    const { listTemplates, activeTemplates } = useTemplateStore();
    const [selectedAppId, setSelectedAppId] = useState<string>("");
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");


    useEffect(() => {
        listApps();
        listTemplates();
    }, []);

    const filteredTemplates = useMemo(() => {
        if (!selectedAppId) return [];
        return activeTemplates.filter((t) => t._id && t.application_id._id === selectedAppId);
    }, [selectedAppId, activeTemplates]);

    return (
        <main className="min-h-screen bg-[#fffaf7] p-6 pt-24 antialiased">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-10 text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Téléchargement de fichiers</h1>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Sélectionnez l'application et le modèle souhaité
                        pour procéder au traitement de vos fichiers en toute simplicité.
                    </p>
                    <div className="hidden md:flex flex-1 items-center justify-center p-4">
                        <Image src={removebg} alt="uploading" width={200} height={200} priority style={{ height: 'auto' }} />
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-50">
                    <div className="flex flex-col md:flex-row gap-6">

                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Application</label>
                                <Select
                                    onValueChange={(value) => {
                                        setSelectedAppId(value);
                                        setSelectedTemplateId("");
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Choisir une application" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {activeApps.map((app) => (
                                                <SelectItem key={app._id} value={app?._id}>{app.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                             <div className="space-y-2 text-gray-200">
                                <label className="text-sm font-medium text-gray-500 ml-1">Modèle (Template)</label>
                                <Select
                                    disabled={!selectedAppId || filteredTemplates.length === 0}
                                    value={selectedTemplateId}
                                    onValueChange={setSelectedTemplateId}>
                                    <SelectTrigger className="w-full text-gray-700">
                                        <SelectValue placeholder="Choisir un modèle"
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredTemplates.length > 0 ? (
                                            filteredTemplates.map((t) => (
                                                <SelectItem key={t._id} value={t._id!}>
                                                    {t.filename}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {/* message d'erreur */}
                                {filteredTemplates.length === 0 && selectedAppId &&(
                                    <span className="text-xs text-red-400 ml-1">
                                        Aucun template trouvé pour cette application
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}