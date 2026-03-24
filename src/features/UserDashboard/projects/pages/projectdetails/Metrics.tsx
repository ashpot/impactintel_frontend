import { DonutChart, type dataType } from "@/shared/components/DonutChart";
import { LineChartMain, type DataPoint } from "@/shared/components/LineChart";
import MetricsTable, { type Metric } from "../../components/MetricsTable";
// metrics mock data
const data:dataType[] = [
  { name: "Operations", value: 30, color: "hsla(44, 100%, 52%, 1)" },
  { name: "Infrastructure",         value: 50, color: "hsla(147, 45%, 48%, 1)" },
  { name: "Training",     value: 20, color: "hsla(0, 94%, 48%, 1)" },
];
const hardcodedData:DataPoint[] = [
  { month: "Jan", score: 43 },
  { month: "Feb", score: 48 },
  { month: "Mar", score: 56 },
  { month: "Apr", score: 59 },
  { month: "May", score: 63 },
  { month: "Jun", score: 66 },
  { month: "Jul", score: 70 },
  { month: "Aug", score: 78 },
];
const mock_metrics: Metric[] = [
  { id: "1", name: "Water Quality Index",  baseline: "45",  target: "85",   achieved: "78",   variance: "+73%"  },
  { id: "2", name: "Households Reached",   baseline: "200", target: "1500", achieved: "1450", variance: "+625%" },
  { id: "3", name: "Satisfaction Score",   baseline: "60%", target: "90%",  achieved: "88%",  variance: "+47%"  },
  { id: "4", name: "Sustainability Rating",baseline: "3.2", target: "4.5",  achieved: "4.3",  variance: "+34%"  },
];

// mock data
const Metrics = () => {
  return (
    <div className="space-y-7">
      {/* charts */}
      <section className="grid grid-cols-2 gap-x-8">
        <LineChartMain 
          title='Monthly Progress'
          data={hardcodedData}
          ticks={[0, 20, 40, 60, 80]}
        />
        <DonutChart 
          items={data}
          header="Budget Distribution"
        />
      </section>
      {/* table */}
      <section>
        <MetricsTable 
          title="Performance Metrics"
          data={mock_metrics}
        />
      </section>
    </div>
  )
}

export default Metrics
