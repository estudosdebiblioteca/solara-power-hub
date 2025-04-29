
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Zap, PiggyBank, Percent, FileText } from "lucide-react";
import { toast } from "sonner";

interface ClientViewProps {
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
}

const ClientView = ({ isOpen, onClose, client }: ClientViewProps) => {
  const handleGenerateInvoice = () => {
    toast.success(`Fatura gerada para ${client.name}`);
    // Em uma implementação real, aqui redirecionaria para uma página 
    // de fatura ou abriria um modal com os detalhes da fatura
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
          <DialogDescription>
            Informações detalhadas sobre o cliente associado a esta usina.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-solar-blue/20 flex items-center justify-center">
              <User className="h-6 w-6 text-solar-blue" />
            </div>
            <div>
              <h3 className="font-medium text-lg">{client.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Cliente desde {client.since}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Consumo</span>
                </div>
                <p className="text-2xl font-bold mt-2">{client.consumption}</p>
                <p className="text-xs text-muted-foreground">Total mensal</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <PiggyBank className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Economia</span>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-2">{client.saving}</p>
                <p className="text-xs text-muted-foreground">Economia mensal</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Percent className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Participação na Usina</span>
              </div>
              <p className="text-2xl font-bold mt-2">{client.share}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${client.share}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {client.units} unidade{client.units > 1 ? 's' : ''} consumidora{client.units > 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleGenerateInvoice}
            className="flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Gerar Fatura
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientView;
