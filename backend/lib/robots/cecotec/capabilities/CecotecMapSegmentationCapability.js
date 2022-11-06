const Logger = require("../../../Logger");
const MapSegmentationCapability = require("../../../core/capabilities/MapSegmentationCapability");

/**
 * @extends MapSegmentationCapability<import("../CecotecCongaRobot")>
 */
class CecotecMapSegmentationCapability extends MapSegmentationCapability {
    /**
     * Could be phrased as "cleanSegments" for vacuums or "mowSegments" for lawnmowers
     *
     *
     * @param {Array<import("../../../entities/core/ValetudoMapSegment")>} segments
     * @returns {Promise<void>}
     */
    async executeSegmentAction(segments) {
        if (!this.robot.robot) {
            throw new Error("There is no robot connected to server");
        }

        const map = this.robot.robot.device.map;

        if (!map) {
            throw new Error("There is no map in connected robot");
        }

        
        Logger.info(`Segments: ${segments}`);

        const segmentIds = segments.map(segment => {
            return segment.id.toString();
        });

        Logger.info(`1. Segment IDs: ${segmentIds}`);

        const rooms = map.rooms.filter(room => {
            return segmentIds.includes(room.id.toString());
        });
        Logger.info(`2. Segment IDs: ${segmentIds}`);
        Logger.info(`Executing segment action for rooms: ${rooms}`);

        await this.robot.robot.cleanRooms(rooms);
    }
}

module.exports = CecotecMapSegmentationCapability;
