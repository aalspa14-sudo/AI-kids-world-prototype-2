import { USER_DATA } from "../data/userData";
import { SectionHeader } from "./shared";
import PredictOMatic from "./activities/PredictOMatic";
import PixelDecoder from "./activities/PixelDecoder";

/**
 * Registry of playable activities. To ship a new mini-game:
 * 1. add its content/config to USER_DATA.activities
 * 2. build the component and append it here.
 */
const ACTIVITY_COMPONENTS = [PredictOMatic, PixelDecoder];

export default function ActivitiesGrid() {
  const { activities } = USER_DATA;

  return (
    <section id="activities" className="relative py-16 md:py-20">
      <div className="wrap">
        <SectionHeader
          badge={activities.badge}
          heading={activities.heading}
          subcopy={activities.subcopy}
        />

        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {ACTIVITY_COMPONENTS.map((Activity, i) => (
            <Activity key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
