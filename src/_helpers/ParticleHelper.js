/**
 *
 *
 * @class ParticleHelper
 */
class ParticleHelper {
  constructor(props) {
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.width = props.width || 0;
    this.radius = props.radius || 4;
    this.health = props.health || 'normal';
    this.speedX = props.speedX || 0.1;
    this.speedY = props.speedY || 0.1;
    this.startDayInfection = this.health === 'normal' ? -1 : 0;
    this.endDayInfection = -1;
  }

  isInLimit = (x, x0, x1) => {
    return (x0 < x) && (x < x1)
  }

  updatePosition(limits) {
    const {x0, y0, x1, y1} = limits;

    if (!this.isInLimit(this.x, x0 + this.radius, x1 - this.radius)) {
      this.speedX *= -1
    }
    if (!this.isInLimit(this.y, y0 + this.radius, y1 - this.radius)) {
      this.speedY *= -1
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateHealth(day, infectionSettings) {
    const { infectionDays } = infectionSettings;
    if (this.health === 'infected' && infectionDays < (day - this.startDayInfection)) {
      this.health = 'recovered'
      this.endDayInfection = day
    } 
  }

  tryInfectAnother(another, infectionSettings, day) {
    if (this.health === 'infected') {
      const dist = this.distanceTo(another);
      const {probability, radius} = infectionSettings;
      if (dist < radius * 2 && Math.random() < probability) {
        another.infect(day);
      }
    }
  }

  infect(day) {
    if (this.health === 'normal') {
      this.health = 'infected'
      this.startDayInfection = day
    }
  }

  distanceTo(a) {
    const dx = a.x - this.x;
    const dy = a.y - this.y;

    return Math.hypot(dx, dy);
  }
}

export { ParticleHelper };
