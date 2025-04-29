
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sun, ArrowLeft, MapPin, Zap, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PlantDetails = () => {
  const { id } = useParams();
  
  // Mock data para uma usina específica (em produção, isso viria de uma API)
  const plant = {
    id: parseInt(id as string),
    name: "Sunny Meadows",
    location: "Arizona",
    capacity: "1.2 MW",
    clients: 5,
    efficiency: 92,
    status: "operational",
    alerts: 0,
    installationDate: "2022-06-15",
    lastMaintenance: "2025-02-10",
    monthlyProduction: [
      { month: "Jan", production: 85 },
      { month: "Fev", production: 88 },
      { month: "Mar", production: 92 },
      { month: "Abr", production: 94 },
      { month: "Mai", production: 96 },
      { month: "Jun", production: 98 },
    ],
    specifications: [
      { name: "Tipo de Painel", value: "Monocristalino" },
      { name: "Quantidade de Painéis", value: "450" },
      { name: "Inversores", value: "SolarEdge" },
      { name: "Orientação", value: "Sul" },
      { name: "Inclinação", value: "30°" },
      { name: "Área Total", value: "2500m²" }
    ]
  };

  if (!plant) {
    return <div className="p-6">Carregando detalhes da usina...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/plants">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Usinas
            </Link>
          </Button>
        </div>
        <Button asChild>
          <Link to={`/plants/${id}/manage`}>Gerenciar Usina</Link>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="solar-gradient rounded-lg p-3">
          <Sun className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{plant.name}</h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {plant.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidade</CardTitle>
            <Zap className="h-4 w-4 text-solar-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plant.capacity}</div>
            <p className="text-xs text-muted-foreground">Potência instalada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
            <Zap className="h-4 w-4 text-solar-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plant.efficiency}%</div>
            <Progress value={plant.efficiency} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Instalação</CardTitle>
            <Calendar className="h-4 w-4 text-solar-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(plant.installationDate).toLocaleDateString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              Última manutenção: {new Date(plant.lastMaintenance).toLocaleDateString("pt-BR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produção Mensal (kWh)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <div className="flex h-full items-end justify-between">
              {plant.monthlyProduction.map((item) => (
                <div key={item.month} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-solar-blue rounded-t"
                    style={{ height: `${item.production}px` }}
                  ></div>
                  <div className="mt-2 text-sm">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Especificações Técnicas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Especificação</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plant.specifications.map((spec) => (
                <TableRow key={spec.name}>
                  <TableCell className="font-medium">{spec.name}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantDetails;
