import { useAppStore } from "@/app/store/appStore";
import { useTemplateStore } from "@/app/store/templateStore";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function Form() {
  const { listApps, activeApps } = useAppStore();
  const { listTemplates, activeTemplates, uploadFile, loading } = useTemplateStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId || !selectedTemplateId) return;

    const selectedTemplate = filteredTemplates.find(t => t._id === selectedTemplateId);
    //  console.log("selectedTemplate;;;;:", selectedTemplate);
    if (!selectedTemplate?.filename) return;
    await uploadFile({
      application_id: selectedAppId,
      filename: selectedTemplate.filename,
    });
    setSelectedAppId("");
    setSelectedTemplateId("");
    (e.target as HTMLFormElement).reset();
  };


  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-50">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <FieldGroup>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 ml-1">Application</label>
              <Select
                value={selectedAppId}
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
                      <SelectItem key={app._id} value={app._id}>
                        {app.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500 ml-1">Modèle (Template)</label>
              <Select
                disabled={!selectedAppId || filteredTemplates.length === 0}
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un template" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTemplates.map((t) => (
                    <SelectItem key={t._id} value={t._id!}>
                      {t.filename}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {filteredTemplates.length === 0 && selectedAppId && (
                <p className="text-xs text-red-400 ml-1">
                  Aucun template trouvé pour cette application
                </p>
              )}
            </div>
            <Field orientation="horizontal" className="flex w-full justify-between pt-4">
              <Button type="submit" disabled={!selectedTemplateId} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération du fichier...
                  </>
                ) : (
                  "Télécharger le pdf"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </div>
      </form>
    </div>
  );
  //   http://localhost:8000/templates/pdf
}