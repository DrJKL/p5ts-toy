import p5 from "p5";

export class PolygonHelper {
  public static draw(numberOfSides: number, width: number, p?: p5) {
    p.push();    
        const angle = p.TWO_PI / numberOfSides;
        const radius = width / 2;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
          let sx = p.cos(a) * radius;
          let sy = p.sin(a) * radius;
          p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
        p.pop();
  }
}
