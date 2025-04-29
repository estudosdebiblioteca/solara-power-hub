
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Percent } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

interface ClientEditProps {
  isOpen: boolean;
  onClose: () => void;
  client: {
    id: number;
    name: string;
    units: number;
    consumption: string;
    saving: string;
    share: number;
    since: string;
  };
  onSave: (id: number, newShare: number) => void;
}

const formSchema = z.object({
  share: z.number().min(1, "Participação deve ser pelo menos 1%").max(100, "Participação não pode exceder 100%"),
});

const ClientEdit = ({ isOpen, onClose, client, onSave }: ClientEditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      share: client.share,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(client.id, values.share);
    toast.success("Participação do cliente atualizada com sucesso!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Participação do Cliente</DialogTitle>
          <DialogDescription>
            Ajuste a participação de {client.name} nesta usina solar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="share"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-blue-500" />
                    Participação na Usina
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Slider
                        value={[field.value]}
                        min={1}
                        max={100}
                        step={1}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">1%</span>
                        <Input 
                          type="number"
                          value={field.value}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-20 text-center"
                          min={1}
                          max={100}
                        />
                        <span className="text-sm text-muted-foreground">100%</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    A participação determina a proporção da energia gerada que é alocada para este cliente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientEdit;
