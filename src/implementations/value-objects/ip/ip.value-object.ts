import { isIP } from "net";

import { Output } from "src/utils/output/output.util";
import { IIpProps } from "src/implementations/value-objects/ip/ip.props";
import { INVALID_IP } from "src/implementations/value-objects/ip/ip.errors";
import { NONE, V4, V6 } from "src/utils/enums/ip-version.enum";
import { PRIVATE, PUBLIC } from "src/utils/enums/ip-scoop.enum";
import { ValueObject } from "src/abstract/value-object/value-object.abstract";

export class IpValueObject extends ValueObject<IIpProps> {
  get version() {
    return isIP(this.value);
  }

  get scoop() {
    let isPrivateIp: boolean;

    if (this.isIPv4) {
      const ipParts = this.value.split(".").map(Number);
      const ipNumber =
        ((ipParts[0] << 24) |
          (ipParts[1] << 16) |
          (ipParts[2] << 8) |
          ipParts[3]) >>>
        0;

      const privateIPRanges = [
        { start: 167772160, end: 184549375 }, // 10.0.0.0 to 10.255.255.255
        { start: 2886729728, end: 2887778303 }, // 172.16.0.0 to 172.31.255.255
        { start: 3232235520, end: 3232301055 }, // 192.168.0.0 to 192.168.255.255
      ];

      // Checks if the IP is in some private IP range
      isPrivateIp = privateIPRanges.some(
        (range) => ipNumber >= range.start && ipNumber <= range.end,
      );
    } else {
      const normalizedIP = this.value.toLowerCase();

      const privateIPPrefixes = [
        "::1", // Loopback
        "fc00::", // ULA (Unique Local Address)
        "fd00::", // ULA (Unique Local Address)
        "fe80::", // Link-local unicast
        "fec0::", // Site-local unicast (obsoleto)
        "2001:db8::", // Documentação
      ];

      // Checks if the IP starts with some prefixe of private IPs
      isPrivateIp = privateIPPrefixes.some((prefix) =>
        normalizedIP.startsWith(prefix),
      );
    }

    return isPrivateIp ? PRIVATE : PUBLIC;
  }

  get isPublicIP() {
    return this.scoop === PUBLIC;
  }

  get isPrivateIP() {
    return this.scoop === PRIVATE;
  }

  get isIPv4() {
    return this.version === V4;
  }

  get isIPv6() {
    return this.version === V6;
  }

  protected sanitizeProps(): void {
    this.props.value.trim();
  }

  protected isValidProps(): boolean {
    return this.version !== NONE;
  }

  static init(props: IIpProps) {
    const ip = new IpValueObject(props);
    const isInvalidProps = !ip.isValidProps();

    if (isInvalidProps) {
      return Output.fail(INVALID_IP);
    }

    return Output.success(ip);
  }
}
