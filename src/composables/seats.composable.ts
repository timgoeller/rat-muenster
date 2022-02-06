import { ref } from 'vue';
import data from '../data/sitzplan-rat-muenster-2021-nov.json'

type RawCouncilMember = {
  name: string,
  pid: string,
  party: string,
  seat: string,
}

type CouncilMember = {
  name: string,
  pid: number,
  party: string,
  seatRow: number,
  seatColumn: number,
  color: string,
}

enum Partys {
  CDU = 'CDU',
  SPD = 'SPD',
  FDP = 'FDP',
  LINKE = 'LINKE',
  OEDP = 'ÖDP',
  NONE = 'OHNE',
  VOLT = 'VOLT',
  AFD = 'AFD',
  GRUENE = 'GRÜNE',
}

const partyColorMappings : { [key in Partys]: string } = {
  [Partys.CDU]: '#000000',
  [Partys.SPD]: '#e3000f',
  [Partys.FDP]: '#ffed00',
  [Partys.LINKE]: '#b61c3e',
  [Partys.OEDP]: '#f36717',
  [Partys.NONE]: '#adb9ca',
  [Partys.VOLT]: '#562883',
  [Partys.AFD]: '#009ee0',
  [Partys.GRUENE]: '#004743',
};

const parseSeatRow = (seat: string): { seatRow: number, seatColumn: number } => {
  const seatSplit = seat.split('-');
  return {
    seatRow: Number.parseInt(seatSplit[0]) - 2,
    seatColumn: Number.parseInt(seatSplit[1]) - 1
  }
}

const parseCouncilMember = (member: RawCouncilMember): CouncilMember => {
  return {
    name: member.name,
    pid: Number.parseInt(member.pid),
    party: member.party,
    color: partyColorMappings[member.party as Partys],
    ...parseSeatRow(member.seat)
  }
}

export default () => {
  const councilMembers = ref((data as RawCouncilMember[]).map(member => parseCouncilMember(member)))
  
  const maxRow = ref(Math.max(...councilMembers.value.map(member => member.seatRow), 0));
  const maxColumn = ref(Math.max(...councilMembers.value.map(member => member.seatColumn), 0));

  console.log(maxRow)
  console.log(maxColumn)

  const seatMap = ref<(CouncilMember | undefined)[][]>([])

  for (let column: number = 0; column < maxColumn.value; column++) {
    seatMap.value[column] = []
    for (let row: number = 0; row < maxRow.value; row++) {
      seatMap.value[column][row] = councilMembers.value.find(member => member.seatColumn === column && member.seatRow === row)
      
    }
  }

  return {
    councilMembers,
    maxRow,
    maxColumn,
    seatMap,
  }
}
