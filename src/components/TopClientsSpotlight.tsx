import { Link } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CustomerDataService } from "@/services/customerData";

const TopClientsSpotlight = () => {
  const topClients = CustomerDataService.getAllCustomers()
    .sort((a, b) => b.exposure - a.exposure)
    .slice(0, 3);

  const maxExposure = topClients[0]?.exposure ?? 1;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const getRatingTone = (rating: string) => {
    const tones: Record<string, string> = {
      AAA: "bg-emerald-100 text-emerald-800",
      AA: "bg-emerald-100 text-emerald-800",
      A: "bg-sky-100 text-sky-800",
      BBB: "bg-amber-100 text-amber-800",
      BB: "bg-orange-100 text-orange-800",
      B: "bg-rose-100 text-rose-800",
      CCC: "bg-rose-100 text-rose-800",
    };

    return tones[rating] ?? "bg-slate-100 text-slate-800";
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {topClients.map((client, index) => (
        <Card
          key={client.id}
          className="group flex flex-col justify-between border border-slate-200/80 bg-white/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="flex flex-1 flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-500">#{index + 1}</span>
                  <Badge className={`${getRatingTone(client.rating)} font-medium`}>{client.rating}</Badge>
                </div>
                <Link
                  to={`/customer/${client.id}`}
                  className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600"
                >
                  <Building2 className="h-5 w-5 text-slate-400" />
                  {client.name}
                </Link>
              </div>
              <Link
                to={`/customer/${client.id}`}
                className="rounded-full border border-transparent bg-slate-100 p-2 text-slate-500 transition-colors hover:border-blue-500/40 hover:bg-blue-50 hover:text-blue-600"
                aria-label={`Open ${client.name} overview`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Exposure</span>
                <span className="font-semibold text-slate-900">{formatCurrency(client.exposure)}</span>
              </div>
              <Progress value={(client.exposure / maxExposure) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
              <div>
                <p className="font-semibold uppercase tracking-wide text-slate-400">Sector</p>
                <p className="text-slate-700">{client.sector}</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-slate-400">Region</p>
                <p className="text-slate-700">{client.region}</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-slate-400">PD</p>
                <p className="text-slate-700">{client.pd.toFixed(1)}%</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-slate-400">Expected loss</p>
                <p className="text-rose-600">{formatCurrency(client.expectedLoss)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopClientsSpotlight;
