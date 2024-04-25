import { SliceZone } from "@prismicio/react";
import {
    getSlices,
    SliceSimulator,
} from "@slicemachine/adapter-next/simulator";

import { components } from "../../slices";

import type { SliceSimulatorParams } from "@slicemachine/adapter-next/simulator";
export default function SliceSimulatorPage({
    searchParams,
}: SliceSimulatorParams) {
    const slices = getSlices(searchParams.state);

    return (
        <SliceSimulator background="#0a0a0a">
            <SliceZone slices={slices} components={components} />
        </SliceSimulator>
    );
}
